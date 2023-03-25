import { useRouter } from 'next/router';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from 'next/link';

function MainNav() {
    const router = useRouter();
    const [searchField, setSearchField] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsExpanded(false);
        const queryString = `title=true&q=${searchField}`;
        router.push(`/artwork?${queryString}`);
    };

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    const handleLinkClick = () => {
        setIsExpanded(false);
    };

    return (
        <>
            <Navbar
                className="fixed-top navbar-dark bg-dark"
                expand="lg"
                variant="light"
                expanded={isExpanded}
            >
                <Container fluid>
                    <Navbar.Brand>Giuseppe Cosentino</Navbar.Brand>
                    <Navbar.Toggle
                        aria-controls="navbarScroll"
                        onClick={handleToggle}
                    />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link href="/" active={router.pathname === '/'} onClick={handleLinkClick}>
                                Home
                            </Nav.Link>
                            <Nav.Link href="/search" active={router.pathname === '/search'} onClick={handleLinkClick}>
                                Advanced Search
                            </Nav.Link>
                        </Nav>
                        <Form className="d-flex" onSubmit={handleSubmit}>
                            &nbsp;
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                value={searchField}
                                onChange={(event) => setSearchField(event.target.value)}
                            />
                            <Button type="submit" variant="outline-success text-white">
                                Search
                            </Button>
                            &nbsp;
                        </Form>
                        <Nav>
                            <NavDropdown title="User Name">
                                <a href="/favourites" onClick={handleLinkClick}>Favourites</a>
                                <NavDropdown.Divider />
                                <a href="/history" onClick={handleLinkClick}>Search History</a>
                            </NavDropdown>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />
            <br />
        </>
    );
}

export default MainNav;
