import { ref } from '@vue/reactivity';
import { projectFirestore } from '../firebase/config';

const useDocuments = (collection, id) => {
  const error = ref(null);
  const isPending = ref(false);
  let docRef = projectFirestore.collection(collection).doc(id);

  const deleteDoc = async () => {
    error.value = null;
    isPending.value = true;

    try {
      const res = await docRef.delete();

      isPending.value = false;
      return res;
    } catch (err) {
      console.error(err.message);
      error.value = 'Failed deleting the document';
      isPending.value = false;
    }
  };

  const updateDoc = async (updates) => {
    error.value = null;
    isPending.value = true;

    try {
      const res = await docRef.update(updates);

      isPending.value = false;
      return res;
    } catch (err) {
      console.error(err.message);
      error.value = 'Failed updating the document';
      isPending.value = false;
    }
  };

  return { error, deleteDoc, updateDoc, isPending };
};

export default useDocuments;
