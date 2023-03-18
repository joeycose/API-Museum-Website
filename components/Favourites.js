import { useAtom } from 'jotai';
import { favouritesAtom } from '../store';
import ArtworkCard from '../components/ArtworkCard';
import ArtworkCardDetail from './ArtworkCardDetail';

export default function Favourites() {
    const [favouritesList] = useAtom(favouritesAtom);

    return (
        <div className="container">
            <h1>Favourites</h1>
            {favouritesList.length === 0 ? (
                <p>Nothing Here. Try adding some new artwork to the list.</p>
            ) : (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                    {favouritesList.map((objectID) => (
                        <div className="col" key={objectID}>
                            <ArtworkCardDetail objectID={objectID} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

