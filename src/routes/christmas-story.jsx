import ChristmasStory from "../components/ChristmasStory/ChristmasStory";
import {useParams} from "react-router-dom";

const ChristmasStoryRoute = () => {
    const params = useParams();

    return (
        <ChristmasStory storySlug={params.christmasStorySlug} />
    );
}
export default ChristmasStoryRoute;