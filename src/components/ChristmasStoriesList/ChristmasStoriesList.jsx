// React
import {useEffect} from "react";
// Redux
import {useSelector} from "react-redux";
import {christmasStoriesList} from "../../utils/utils";
import {Link} from "react-router-dom";
import styles from "./ChristmasStories.module.scss";
import {projectTitle} from "../../config";

const ChristmasStoriesList = () => {
    const themeState = useSelector(state => state.theme);

    useEffect(() => {
        // Scroll to top of page
        window.scrollTo(0, 0);
        // Set page title
        document.title = `Christmas Stories list -  ${projectTitle}`;
    }, [])

    return (
        <div className={`container ${styles.contentContainer}`}>
            <h1 className={`christmasFont ${styles.title}`}>Christmas Stories</h1>
            <div className={styles.storiesContainer}>
                {christmasStoriesList.map((christmasStory, index) => (
                    <div
                        key={christmasStory.id}
                        className={styles.storyContainer}
                    >
                        <Link
                            className={`${styles.link} ${themeState.theme === "dark" ? styles.linkDark : ""}`}
                            to={`/christmas-stories/${christmasStory.slug}`}
                        >
                            <h2 className={`christmasFont ${styles.title}`}>
                                <span>{index + 1}.</span> {christmasStory.title}
                            </h2>
                        {/*<div>{christmasStory.content}</div>*/}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ChristmasStoriesList;