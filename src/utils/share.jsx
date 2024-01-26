import { toast } from 'react-toastify';
export const handleShareClick = (quizId) => {
    const quizLink = `http://localhost:3001/quiz/${quizId}`;

    navigator.clipboard.writeText(quizLink).then(
      () => {
        toast.success('Link copied successfully!');
      },
      (err) => {
        console.error('Unable to copy link to clipboard', err);
        toast.error('Error copying link to clipboard');
      }
    );
};

// const handleShareClick = () => {
//     const quizLink = `http://localhost:3001/quiz/${quizId}`;

//     navigator.clipboard.writeText(quizLink).then(
//       () => {
//         toast.success('Link copied successfully!');
//       },
//       (err) => {
//         console.error('Unable to copy link to clipboard', err);
//         toast.error('Error copying link to clipboard');
//       }
//     );
//   };