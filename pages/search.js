import { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';

export default function MainNav() {
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const [searchValue, setSearchValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchValue.trim()) {
            let queryString = 'title=true';
            queryString += `&q=${encodeURIComponent(searchValue.trim())}`;
            setSearchHistory(current => [...current, queryString]);
            window.location.href = `/artwork?${queryString}`;
        }
    }

    return (
        <Navbar bg="light" expand="lg">
            <Link href="/" passHref>
                <Navbar.Brand>Art Gallery</Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
                <Nav className="mr-auto">
                    <Link href="/artwork" passHref>
                        <Nav.Link>Artwork</Nav.Link>
                    </Link>
                    <Link href="/artists" passHref>
                        <Nav.Link>Artists</Nav.Link>
                    </Link>
                </Nav>
                <Form inline onSubmit={handleSubmit}>
                    <FormControl
                        type="text"
                        placeholder="Search"
                        className="mr-sm-2"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <Button variant="outline-primary" type="submit">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
}
