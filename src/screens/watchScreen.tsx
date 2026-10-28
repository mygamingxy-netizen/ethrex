import { useHistory } from "react-router"
import { AiFillStar, AiFillLike, AiFillHome } from 'react-icons/ai'
import { projectFirestore } from '../firebase/config';
import { useEffect, useState } from "react";
import LoadingScreen from "./components/loadingScreen";
import PrimaryButton from "./components/primaryButton";
import { FaCommentDots } from 'react-icons/fa';
import { LoggedIn, UserEmail } from "./features/localState";
import { RiAccountCircleFill } from 'react-icons/ri';
import { getMedia } from "../data/source";

export default function WatchScreen() {

    const history = useHistory()
    const routeData: any = history.location.state;
    const userEmail = UserEmail();
    const loggedIn = LoggedIn();

    const [currentMedia, setCurrentMedia] = useState<any>([]);
    const [isRemote, setIsRemote] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [loadError, setLoadError] = useState<string>('');
    const likeDisabled = loggedIn ? false : true
    const commentDisabled = loggedIn ? false : true;
    const [comment, setComment] = useState<string>('');

    useEffect(() => { getCurrentMedia() }, [])

    const getCurrentMedia = () => {
        if (!routeData || !routeData.docId) {
            setLoadError('This title could not be opened.');
            setIsLoading(false);
            return;
        }
        getMedia(routeData.docId).then(({ item, remote }) => {
            setCurrentMedia([item]);
            setIsRemote(remote);
            setIsLoading(false);
        }).catch(() => {
            setLoadError('This title could not be opened.');
            setIsLoading(false);
        })
    }

    // Remote titles are written back to Firestore; bundled titles keep their likes and
    // comments for as long as the app is open.
    const persist = (patch: any) => {
        if (!isRemote) return;
        projectFirestore.collection('mediaList').doc(routeData.docId)
            .set(patch, { merge: true })
            .catch(() => { /* catalogue project unavailable - the local edit already landed */ });
    }

    const addLike = () => {
        if (!loggedIn || !userEmail) { alert("Login before Like"); return }
        const media = currentMedia[0];
        const alreadyLiked = media.mediaLikes.filter((item: any) => item.user === userEmail);
        if (alreadyLiked.length === 1) {
            alert("You already liked this movie")
            return
        }
        const mediaLikes = [...media.mediaLikes, { user: `${userEmail}` }];
        setCurrentMedia([{ ...media, mediaLikes }]);
        persist({ mediaLikes });
    }

    const addComment = () => {
        if (!loggedIn || !userEmail) { alert("Login before adding comments"); return }
        if (comment === "") { alert("Please insert Comment !"); return }
        const media = currentMedia[0];
        const mediaComments = [...media.mediaComments, { comment: `${comment}`, commentAuthor: `${userEmail}` }];
        setCurrentMedia([{ ...media, mediaComments }]);
        persist({ mediaComments });
        setComment('')
    }

    if (loadError) {
        return (
            <div className="base-flex watch-screen">
                <div className="notification-plate">
                    <h4>{loadError}</h4>
                    <PrimaryButton onClick={() => { history.push({ pathname: '/' }) }} title={"Back to Home"}>
                        <AiFillHome />
                    </PrimaryButton>
                </div>
            </div>
        )
    }

    return (
        !isLoading ?
            <div className="base-flex watch-screen">
                <div className="base-flex media-frameholder">
                    <div className="base-flex media-head">
                        <PrimaryButton onClick={() => { history.push({ pathname: '/' }) }} title={"Home"} >
                            <AiFillHome />
                        </PrimaryButton>
                        <span className="now-playing">Now playing- {currentMedia[0].mediaName}</span>
                        <PrimaryButton onClick={() => { history.push({ pathname: '/profile' }) }} title={loggedIn ? "Profile" : "Login"} >
                            <RiAccountCircleFill size={22} />
                        </PrimaryButton>
                    </div>
                    <video width="100%" height="90%" controlsList="nodownload" controls src={currentMedia[0].mediaVideo.replace(/"/g, "")}>
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="base-flex media-about">
                    <h2 className="media-head-text">About </h2>
                    <div className="base-flex about-data">
                        <div className="poster-card">
                            <img src={currentMedia[0].mediaPic} alt="Current Movie/Show Poster" />
                        </div>
                        <div className="about-holder">
                            <h2>{currentMedia[0].mediaName}</h2>
                            <div className="base-flex">
                                <span><AiFillStar /> {currentMedia[0].mediaStar}/5</span>
                                <span>{currentMedia[0].mediaGenre.replace(/\|/g, ' · ')}</span>
                                <PrimaryButton disabled={likeDisabled} onClick={addLike} title={`Likes : ${currentMedia[0].mediaLikes.length}`} size={'sm'} >
                                    <AiFillLike />
                                </PrimaryButton>
                            </div>
                            <p>{currentMedia[0].mediaBio}</p>
                        </div>
                    </div>
                </div>
                <div className="base-flex media-about media-comment">
                    <h2>Comments</h2>
                    <textarea className="comment-text" onInputCapture={(e: any) => setComment(e.target.value)} spellCheck placeholder="Such a great movie.."></textarea>
                    <div className="base-flex comment-drawer">
                        <PrimaryButton disabled={commentDisabled} onClick={addComment} title={"Add Comment"}  >
                            <FaCommentDots />
                        </PrimaryButton>
                    </div>
                    {currentMedia[0].mediaComments.length !== 0 ?
                        currentMedia[0].mediaComments.map((item: any) => (
                            <div className="base-flex comment-box">
                                <img src={`https://avatars.dicebear.com/api/identicon/:${item.commentAuthor.split("@")[0]}.svg`} alt="Profile pic of the user who commented on the movie." />
                                <div className="base-flex comment-holder">
                                    <h4 className="comment">{item.comment}</h4>
                                    <h4 className="comment-author">{item.commentAuthor}</h4>
                                </div>
                            </div>
                        ))
                        :
                        <div className="notification-plate"> <h4 >No comments, be the first to start the discussion !</h4></div>
                    }
                </div>
            </div >
            :
            <LoadingScreen />
    )
}
