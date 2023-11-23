import app from './config/server.config.js';
import './config/database.config.js';

console.clear();

const main = async () => {
	app.listen(app.get('port'));
	console.log(
		`The server is running correctly on the port: ${app.get('port')}`,
	);
};

main();
