import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

// Detects Android TV / Google TV / other leanback devices, where a D-pad or remote is the
// only input. `?tv=1` / `?tv=0` forces the mode on or off, which is what makes the TV
// layout testable from a desktop browser or a phone.
export function isTvDevice(): boolean {
    if (typeof window === 'undefined') return false;

    const forced = new URLSearchParams(window.location.search).get('tv');
    if (forced === '1' || forced === '0') return forced === '1';

    const ua = navigator.userAgent || '';
    if (/Android TV|GoogleTV|Google TV|SmartTV|HbbTV|NetCast|Web0S|WebOS|Tizen|BRAVIA|AppleTV|Roku|FireTV|Kodi/i.test(ua)) {
        return true;
    }

    const media = (query: string) => (window.matchMedia ? window.matchMedia(query).matches : false);
    // Android TV's WebView advertises neither a touch screen nor a hover pointer, on a
    // living-room sized screen - which is how TV devices usually show up to JavaScript.
    const bigEnough = window.innerWidth >= 1200 && window.innerHeight >= 600;
    const noTouch = (navigator.maxTouchPoints || 0) === 0;
    const noHover = !media('(hover: hover)');
    const notFinePointer = media('(pointer: coarse)') || media('(pointer: none)');
    return bigEnough && noTouch && (noHover || notFinePointer);
}

export function useTvMode(): boolean {
    const [tvMode, setTvMode] = useState<boolean>(() => isTvDevice());
    useEffect(() => {
        const onChange = () => setTvMode(isTvDevice());
        window.addEventListener('resize', onChange);
        return () => window.removeEventListener('resize', onChange);
    }, []);
    return tvMode;
}

type Direction = 'up' | 'down' | 'left' | 'right';

const CANDIDATES = 'a, button, [tabindex]';

function visibleFocusables(): HTMLElement[] {
    return Array.from(document.querySelectorAll<HTMLElement>(CANDIDATES)).filter((el) => {
        if ((el as HTMLButtonElement).disabled) return false;
        if (el.getAttribute('aria-hidden') === 'true') return false;
        const rect = el.getBoundingClientRect();
        if (rect.width < 1 || rect.height < 1) return false;
        // Anchors without href are not focusable by default; the remote still needs them.
        if (el.tagName === 'A' && el.tabIndex < 0) el.tabIndex = 0;
        return true;
    });
}

function focusNeighbour(direction: Direction) {
    const items = visibleFocusables();
    if (!items.length) return;

    const active = document.activeElement as HTMLElement | null;
    if (!active || active === document.body || !items.includes(active)) {
        const first = items[0];
        first.focus();
        first.scrollIntoView({ block: 'center', inline: 'center' });
        return;
    }

    const current = active.getBoundingClientRect();
    const ax = current.left + current.width / 2;
    const ay = current.top + current.height / 2;

    let best: HTMLElement | null = null;
    let bestScore = Infinity;

    for (const el of items) {
        if (el === active) continue;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = cx - ax;
        const dy = cy - ay;

        let primary = 0;
        let cross = 0;
        if (direction === 'left') { if (dx >= -1) continue; primary = -dx; cross = Math.abs(dy); }
        if (direction === 'right') { if (dx <= 1) continue; primary = dx; cross = Math.abs(dy); }
        if (direction === 'up') { if (dy >= -1) continue; primary = -dy; cross = Math.abs(dx); }
        if (direction === 'down') { if (dy <= 1) continue; primary = dy; cross = Math.abs(dx); }

        // Stay close to the current row/column unless nothing else is available.
        if (cross > primary * 1.5 + 60) continue;

        const score = primary + cross * 1.5;
        if (score < bestScore) { bestScore = score; best = el; }
    }

    if (best) {
        best.focus();
        best.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
}

// Arrow keys / D-pad move focus, Enter and Space activate, Back and Escape leave the screen.
export function useDpadNavigation(enabled: boolean) {
    const history = useHistory();

    useEffect(() => {
        if (!enabled) return;

        const onKeyDown = (event: KeyboardEvent) => {
            const target = event.target as HTMLElement | null;
            const typing = !!target && (
                target.tagName === 'INPUT' ||
                target.tagName === 'TEXTAREA' ||
                (target.isContentEditable && target.tagName !== 'VIDEO')
            );
            if (typing) return;

            switch (event.key) {
                case 'ArrowUp': event.preventDefault(); focusNeighbour('up'); break;
                case 'ArrowDown': event.preventDefault(); focusNeighbour('down'); break;
                case 'ArrowLeft': event.preventDefault(); focusNeighbour('left'); break;
                case 'ArrowRight': event.preventDefault(); focusNeighbour('right'); break;
                case 'Enter': {
                    const active = document.activeElement as HTMLElement | null;
                    if (active && (active.tagName === 'A' || active.tagName === 'BUTTON')) {
                        event.preventDefault();
                        active.click();
                    }
                    break;
                }
                case ' ': case 'Spacebar': {
                    const active = document.activeElement as HTMLElement | null;
                    if (active && (active.tagName === 'A' || active.tagName === 'BUTTON')) {
                        event.preventDefault();
                        active.click();
                        break;
                    }
                    const video = document.querySelector('video') as HTMLVideoElement | null;
                    if (video) {
                        event.preventDefault();
                        if (video.paused) video.play(); else video.pause();
                    }
                    break;
                }
                case 'Escape': case 'Backspace': case 'BrowserBack': {
                    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) break;
                    event.preventDefault();
                    if (window.history.length > 1) history.goBack();
                    else history.push({ pathname: '/' });
                    break;
                }
                default: break;
            }
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [enabled, history]);
}
