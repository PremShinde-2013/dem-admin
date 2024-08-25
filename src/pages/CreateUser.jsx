import React, { useState } from 'react';
import { Button, Label, TextInput, Toast } from "flowbite-react";
import { Client, Users } from "node-appwrite";
import { v4 as uuidv4 } from "uuid";
import toast, { Toaster } from 'react-hot-toast';

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("66c77436002fcaa073c9")
    .setKey("c71b4b6a00c42200598dd0d5d8c06aa0761077f0fdc51b847a414febcb756bcbb64b305b127347ce3b5a5f7681f7ee8491bd968c5701db6009f46a9b97543283857aba306f91eee9fadab8e076dc20846892cc0126d67dbf34a91baaee2f63309b30ed1d8add051d5ac61d39591bf6a90474143fc8be3b26e131c100748e1554");

const users = new Users(client);

const CreateUser = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: ""
    });

    const [showToast, setShowToast] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, phone, password } = formData;

        try {
            const userResponse = await users.create(
                uuidv4(),
                email,
                phone,
                password,
                name
            );

            console.log("User created successfully:", userResponse);
            toast.success("User created successfully !!");
        } catch (error) {
            console.error("Error creating user:", error);
            toast.error("Failed to create user. A user with the same email, or phone already exists !!");
        }
    };

    return (
        <div className='flex justify-center'>
            <div>
                <Toaster />
            </div>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div>
                    <Label htmlFor="name" value="Full Name" />
                    <TextInput
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="email" value="Email Address" />
                    <TextInput
                        id="email"
                        type="email"
                        placeholder="name@flowbite.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="phone" value="Phone Number" />
                    <TextInput
                        id="phone"
                        type="text"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="password" value="Password" />
                    <TextInput
                        id="password"
                        type="password"
                        placeholder="Enter a password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <Button type="submit">Submit</Button>
            </form>


        </div>
    );
};

export default CreateUser;
