const Bdd_client = require('./add_client');
const Client = require('./Client');

async function runTests() {
    const bdd_client = new Bdd_client();
    await bdd_client.connect();

    try {
        // Test add_client_to_bdd
        const clientToAdd = new Client('1', 'jejman', 'John', 'Doe', 'password123', 123456789, ['address1', 'address2']);
        await bdd_client.add_client_to_bdd(clientToAdd);

        // Test get_client_from_bdd
        const fetchedClient = await bdd_client.get_client_from_bdd('1');
        console.log("Fetched client:", fetchedClient);

        // Test update_client_bdd
        clientToAdd.set_username('jane_doe');
        await bdd_client.update_client_bdd(clientToAdd);
        const updatedClient = await bdd_client.get_client_from_bdd('1');
        console.log("Updated client:", updatedClient);

        // Test delete_client_bdd
        await bdd_client.delete_client_bdd('1');
        const deletedClient = await bdd_client.get_client_from_bdd('1');
        console.log("Deleted client:", deletedClient);
    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        await bdd_client.close();
    }
}

runTests();