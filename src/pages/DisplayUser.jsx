import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Button, Table, TextInput } from 'flowbite-react';

const sdk = require('node-appwrite');

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66c77436002fcaa073c9')
    .setKey('c71b4b6a00c42200598dd0d5d8c06aa0761077f0fdc51b847a414febcb756bcbb64b305b127347ce3b5a5f7681f7ee8491bd968c5701db6009f46a9b97543283857aba306f91eee9fadab8e076dc20846892cc0126d67dbf34a91baaee2f63309b30ed1d8add051d5ac61d39591bf6a90474143fc8be3b26e131c100748e1554');

const users = new sdk.Users(client);

const UserTable = () => {
    const [userList, setUserList] = useState([]);
    const [filteredUserList, setFilteredUserList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await users.list();
                setUserList(response.users);
                setFilteredUserList(response.users);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching users:', error);
                toast.error('Failed to fetch users. Please try again.');
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleSearch = () => {
        if (searchQuery.trim() === '') {
            setFilteredUserList(userList);
        } else {
            const filtered = userList.filter(user => user.email.includes(searchQuery.trim()));
            setFilteredUserList(filtered);
        }
    };

    return (
        <>
            <div>
                <div>
                    <div className="flex flex-wrap gap-2">
                        <div>

                            <TextInput
                                id="Email"
                                type="string"
                                placeholder="Enter Email"
                                required
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button
                            outline
                            gradientDuoTone="cyanToBlue"
                            onClick={handleSearch}
                        >
                            Search
                        </Button>

                        <Button
                            outline
                            gradientDuoTone="cyanToBlue"
                            href="/create-user"
                        >
                            Create User
                        </Button>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div className="w-full max-w-7xl">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <Table hoverable>
                                <Table.Head>
                                    <Table.HeadCell>User ID</Table.HeadCell>
                                    <Table.HeadCell>Email</Table.HeadCell>
                                    <Table.HeadCell>Name</Table.HeadCell>
                                    <Table.HeadCell>Phone</Table.HeadCell>
                                    <Table.HeadCell>Created At</Table.HeadCell>
                                    <Table.HeadCell>Updated At</Table.HeadCell>
                                </Table.Head>
                                <Table.Body>
                                    {filteredUserList.length > 0 ? (
                                        filteredUserList.map((user) => (
                                            <Table.Row key={user.$id}>
                                                <Table.Cell>{user.$id}</Table.Cell>
                                                <Table.Cell>{user.email}</Table.Cell>
                                                <Table.Cell>{user.name || 'N/A'}</Table.Cell>
                                                <Table.Cell>{user.phone || 'N/A'}</Table.Cell>
                                                <Table.Cell>{user.$createdAt || 'N/A'}</Table.Cell>
                                                <Table.Cell>{user.$updatedAt || 'N/A'}</Table.Cell>
                                            </Table.Row>
                                        ))
                                    ) : (
                                        <Table.Row>
                                            <Table.Cell colSpan="6">No users found</Table.Cell>
                                        </Table.Row>
                                    )}
                                </Table.Body>
                            </Table>
                        )}
                    </div>
                    <Toaster />
                </div>
            </div>
        </>
    );
};

export default UserTable;
