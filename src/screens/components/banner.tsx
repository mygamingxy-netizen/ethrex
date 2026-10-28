import { AiFillStar } from 'react-icons/ai'
import PrimaryButton from './primaryButton'
import { getBanner } from '../../data/source'
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

export default function Banner(props: any) {

    const history = useHistory()

    const [bannerMedia, setBannerMedia] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => { getBannerMedia() }, [props.mode])

    const getBannerMedia = () => {
        getBanner(props.mode).then((banner: any) => {
            setBannerMedia(banner ? [banner] : []);
            setIsLoading(false);
        }).catch(() => { setBannerMedia([]); setIsLoading(false); })
    }

    const cardTap = (cardData: any) => {
        const routeData = { docId: `${cardData.showRedirect}` }
        history.push({ pathname: '/watch', search: `?${cardData.showName.replace(" ", '-')}/`, hash: `${cardData.showId.replace(" ", "-")}`, state: routeData });
    }

    return (
        !isLoading && bannerMedia.length !== 0 ?
            <div className="base-flex banner">
                <div className="banner-img-holder">
                    <img className="banner-img" src={bannerMedia[0].showPic} alt="Banner Show or Movie Poster " />
                </div>

                <div className="base-flex banner-content-holder">
                    <div className="base-flex banner-content">
                        <h1 className="banner-show-name">{bannerMedia[0].showName}</h1>
                        <div className="base-flex banner-show-stats">
                            <span className="base-flex"><AiFillStar size={20} /><span>{bannerMedia[0].showStars}/5</span></span>
                            {bannerMedia[0].showYear && <span className="base-flex">{bannerMedia[0].showYear}</span>}
                            {bannerMedia[0].showSeason && <span className="base-flex">{bannerMedia[0].showSeason}</span>}
                        </div>
                        <p className="banner-show-bio">
                            {bannerMedia[0].showBio}
                        </p>
                        <PrimaryButton type={"Play"} title={"Watch Now"} onClick={() => cardTap(bannerMedia[0])} />
                    </div>
                </div>
            </div>
            :
            <></>
    )
}