import { ref } from '@vue/reactivity';
import { watchEffect } from '@vue/runtime-core';
import { projectFirestore } from '../firebase/config';

const getDocument = (collection, id) => {
  const error = ref(null);
  const document = ref(null);

  let documentRef = projectFirestore.collection(collection).doc(id);

  const unsub = documentRef.onSnapshot(
    (doc) => {
      if (doc.data()) {
        document.value = { ...doc.data(), id: doc.id };
        error.value = null;
      } else {
        error.value = 'That document does not exist';
      }
    },
    (err) => {
      console.log(err.message);
      document.value = null;
      error.value = 'Coldn`t fetch document';
    }
  );

  watchEffect((onInvalidate) => {
    // unsub from prev collection when watcher
    // is stopped (component unmounted)
    onInvalidate(() => unsub());
  });

  return { document, error };
};

export default getDocument;
