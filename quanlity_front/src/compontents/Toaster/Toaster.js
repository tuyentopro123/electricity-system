import toast, { Toaster } from 'react-hot-toast';
export const notify = (message) =>
    toast(message, {
        icon: '🛠',
    });
export const uppercase = (message) => {
    var list = message.split(' ');
    for (var i = 0; i < list.length; i++) {
        var letter = list[i];
        list[i] = letter.charAt(0).toUpperCase() + letter.slice(1).toLowerCase();
    }

    var newMess = list.join(' ');

    return newMess;
};
