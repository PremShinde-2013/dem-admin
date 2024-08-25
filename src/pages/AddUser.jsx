import React, { useState } from 'react';
import { Button, Label, TextInput, Select } from 'flowbite-react';
import { Client, Teams } from 'appwrite';
import toast, { Toaster } from 'react-hot-toast';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66c77436002fcaa073c9');

const teams = new Teams(client);

const AddTeamMember = () => {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('Employee');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await teams.createMembership(
                '66cb0e90001d37f6c42b',
                [role.toLowerCase()],
                email
            );

            console.log('Member added successfully:', response);
            toast.success('Member added successfully!');
        } catch (error) {
            console.error('Error adding member:', error);
            toast.error('Failed to add member. Please try again.');
        }
    };

    return (
        <div className='flex justify-center'>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div>
                    <Label htmlFor="email" value="Member Email" />
                    <TextInput
                        id="email"
                        type="email"
                        placeholder="Enter member's email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="role" value="Role" />
                    <Select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    >
                        <option>Employee</option>
                        <option>Admin</option>
                        <option>User</option>
                    </Select>
                </div>
                <Button type="submit">Add Member</Button>
            </form>
            <Toaster />
        </div>
    );
};

export default AddTeamMember;
