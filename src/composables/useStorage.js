import { projectStorage } from '../firebase/config';
import { ref } from '@vue/reactivity';
import getUser from './getUser';

const { user } = getUser();

const useStorage = () => {
  const error = ref(null);
  const url = ref(null);
  const filePath = ref(null);

  const uploadImage = async (file) => {
    const randomPrefix = Math.round(Math.random() * 10000);
    filePath.value = `covers/${user.value.uid}/${randomPrefix}${file.name}`;
    const storageRef = projectStorage.ref(filePath.value);

    try {
      const res = await storageRef.put(file);
      url.value = await res.ref.getDownloadURL();
      error.value = null;
    } catch (err) {
      console.log(err.message);
      error.value = error.message;
    }
  };

  const deleteImage = async (path) => {
    const storageRef = projectStorage.ref(path);

    try {
      const res = await storageRef.delete();
      error.value = null;
    } catch (err) {
      console.log(err.message);
      error.value = error.message;
    }
  };

  return { url, filePath, error, uploadImage, deleteImage };
};

export default useStorage;
