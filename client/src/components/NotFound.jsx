import { Link } from 'react-router-dom';

export const NotFound = (props) => {

    return (
        <div>
            <p>
                We're sorry, but we could not find the pet you are looking for. 
            </p>
            <p>
                Would you like to add this pet to our database?
            </p>
            <Link to={"/pets/new"}>Add A New Pet</Link>
        </div>
    );
};

export default NotFound;