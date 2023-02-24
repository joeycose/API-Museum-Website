import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Form, Button, Col, Row } from 'react-bootstrap';

export default function AdvancedSearch() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const submitForm = (data) => {
        let queryString = 'searchBy=true';
        if (data.geoLocation) {
            queryString += `&geoLocation=${encodeURIComponent(data.geoLocation)}`;
        }
        if (data.medium) {
            queryString += `&medium=${encodeURIComponent(data.medium)}`;
        }
        queryString += `&isOnView=${data.isOnView}&isHighlight=${data.isHighlight}`;
        queryString += `&q=${encodeURIComponent(data.q)}`;

        router.push(`/artwork?${queryString}`);
    };

    return (
        <Form onSubmit={handleSubmit(submitForm)}>
            <Form.Group controlId="q">
                <Form.Label className="form-label">Search Query</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter a search query"
                    {...register('q', { required: true })}
                    className={`${errors.q ? 'is-invalid' : ''}`}
                />
                {errors.q && (
                    <Form.Control.Feedback type="invalid">
                        This field is required.
                    </Form.Control.Feedback>
                )}
            </Form.Group>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="searchBy">
                    <Form.Label className="form-label">Search by</Form.Label>
                    <Form.Control as="select" {...register('searchBy')}>
                        <option value="artist">Artist</option>
                        <option value="title">Title</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="geoLocation">
                    <Form.Label className="form-label">Location</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter a location"
                        {...register('geoLocation')}
                    />
                </Form.Group>
                <Form.Group as={Col} controlId="medium">
                    <Form.Label className="form-label">Medium</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter a medium"
                        {...register('medium')}
                    />
                </Form.Group>
            </Row>
            <Form.Group controlId="isOnView">
                <Form.Check
                    type="checkbox"
                    label="Only show works on view"
                    name="isOnView"
                    {...register('isOnView')}
                />
            </Form.Group>
            <Form.Group controlId="isHighlight">
                <Form.Check
                    type="checkbox"
                    label="Only show highlighted works"
                    name="isHighlight"
                    {...register('isHighlight')}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Search
            </Button>
            <style jsx>{`
                .mb-3 {
                    margin-bottom: 1.5rem;
                }
                .form-label {
                    margin-bottom: 0.5rem;
                }
            `}</style>
        </Form>
    );
}
