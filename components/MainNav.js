import { useRouter } from 'next/router';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function MainNav() {
    const router = useRouter();
    const [searchField, setSearchField] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        router.push(`/artwork?title=true&q=${searchField}`);
    };

    return (
        <>
            <Navbar className="fixed-top navbar-dark bg-primary" expand="lg" variant="light">
                <Container fluid>
                    <Navbar.Brand>Giuseppe Cosentino</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/search">Advanced Search</Nav.Link>
                        </Nav>
                        <Form className="d-flex" onSubmit={handleSubmit}>
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                value={searchField}
                                onChange={(event) => setSearchField(event.target.value)}
                            />
                            <Button type="submit" variant="outline-success text-white">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />
            <br />
        </>
    );
}

export default MainNav;
