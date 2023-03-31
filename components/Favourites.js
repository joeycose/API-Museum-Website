import { useAtom } from 'jotai';
import { favouritesAtom } from '../store';
import ArtworkCardDetail from './ArtworkCardDetail';
import { useEffect, useState } from 'react';

export default function Favourites() {
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted) {
            const buttons = document.getElementsByClassName("favourite-btn");
            for (let i = 0; i < buttons.length; i++) {
                const button = buttons[i];
                const artworkId = button.getAttribute("data-artwork-id");
                const artwork = favouritesList.find((fav) => fav.objectID === artworkId);
                if (artwork) {
                    button.textContent = "(Favorite (added)";
                } else {
                    button.textContent = "+ Favourite";
                }
            }
        }
    }, [favouritesList, isMounted]);

    const handleFavouriteToggle = (objectID) => {
        const index = favouritesList.findIndex((fav) => fav.objectID === objectID);
        if (index !== -1) {
            const updatedList = [...favouritesList];
            updatedList.splice(index, 1);
            setFavouritesList(updatedList);
        } else {
            const artwork = {
                objectID,
                title: '',
                primaryImage: '',
                artistDisplayName: '',
                artistWikidata_URL: '',
            };
            setFavouritesList((currentList) => [...currentList, artwork]);
        }
    };

    return (
        <div className="container">
            <h1>Favourites</h1>
            {favouritesList.length === 0 ? (
                <p>Nothing Here. Try adding some new artwork to the list.</p>
            ) : (
                favouritesList.map((artwork) => (
                    <ArtworkCardDetail
                        key={artwork.objectID}
                        objectID={artwork.objectID}
                        onFavouriteToggle={handleFavouriteToggle}
                        isFavourited={true}
                    />
                ))
            )}
        </div>
    );
}
