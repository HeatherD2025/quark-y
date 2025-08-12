// import React from 'react';
// import { useSelector } from 'react-redux';
// import { useSaveArticleMutation } from '../api/userApi';

// const saveButton = ({ article }) => {
//     const [saveArticle, {isLoading}] = useSaveArticleMutation();
//     const token = useSelector((state) => state.user.token);

//     const handleSave = async () => {
//         if (!token) {
//             alert('Please register or log in to save articles');
//             return;
//         }

//         try {
//             await saveArticle
//         }
//     }
// }