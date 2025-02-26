import express from 'express';
import {addUser, deleteUser, getAllUsers, getUserById, updateUser} from "@/services/userServices";


const router = express.Router();

router.get('/users', async (req, res) => {
    const users = await getAllUsers();
    res.json(users);
});

router.get('/users/:id', async (req, res) => {
    const user = await getUserById(req.params.id);
    res.json(user);
});

router.post('/users', async (req, res) => {
    await addUser(req.body);
    res.status(201).send('User created');
});

router.put('/users/:id', async (req, res) => {
    await updateUser(req.params.id, req.body);
    res.send('User updated');
});

router.delete('/users/:id', async (req, res) => {
    await deleteUser(req.params.id);
    res.send('User deleted');
});

export default router;
