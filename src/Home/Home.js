import React, { useContext } from 'react';
import { Spinner } from 'reactstrap';
import ItemContext from '../ItemContext';
import { Button } from 'reactstrap';

function Home() {
	const { isLoggedIn, user, isLoading } = useContext(ItemContext);

	if (!isLoggedIn) {
		return (
			<div>
				<h1>Welcome! </h1>
				<a href="/login">
					<Button>Login</Button>
				</a>

				<a href="/signup">
					<Button>Signup</Button>
				</a>
			</div>
		);
	}
	else {
		if (isLoading) {
			return <Spinner />;
		}
		else {
			return (
				<div>
					<h1>Hello, {user.current.firstName}!</h1>
				</div>
			);
		}
	}
}

// if (isLoading) {
// 	return <Spinner />;
// }
// else {
// if (user.current.firstName) {
// 	return (
// 		<div className="Home">
// 			{!isLoggedIn ? (
// 				<div>
// 					<h1>Welcome! </h1>
// 					<a href="/login">
// 						<Button>Login</Button>
// 					</a>

// 					<a href="/signup">
// 						<Button>Signup</Button>
// 					</a>
// 				</div>
// 			) : (
// 				<div>
// 					<h1>Hello, {user.current.firstName}!</h1>
// 				</div>
// 			)}
// 		</div>
// 	);
// }
// }
// }

export default Home;
