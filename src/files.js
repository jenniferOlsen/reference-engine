import { Dropbox } from 'dropbox';

const accessToken = process.env.REACT_APP_DROPBOX_TOKEN;

const dbx = new Dropbox({  
  accessToken,  
  fetch  
});

// Helper function to filter returned array 
// Checks for any text properties (in this case, 'success')
function filterByValue(array, string) {
  return array.filter(item =>
    Object.keys(item).some(text => String(item[text]).includes(string)));
}

export let files = [];
export const getFiles = async () => { 
   const filesData = await dbx.filesListFolder({  
      path: '',
      recursive: true,
      include_non_downloadable_files: false,  
      limit: 25 // thumbnail batch limit imposed by api
  })

  processFiles(filesData.entries)

  if (filesData.has_more) {
    getMoreFiles(filesData.cursor, more => processFiles(more.entries))
  }
}

const processFiles = async(response) => {
   dbx.filesGetThumbnailBatch(
         {    
          entries: response.map(function(entry){
            return {
              path: entry.id,
              format : 'jpeg',
              size: 'w2048h1536',
            }
        })
      }).then(response => {
        let data = response.entries;
        let filtered = filterByValue(data, 'success')
        return files = files.concat(filtered)
      })
}

const getMoreFiles = async (cursor, callback) => {  
  const response = await dbx.filesListFolderContinue({ cursor }) 
  if (callback) callback(response)
  if (response.has_more) {  
      // if there are more files, call getMoreFiles recursively,  
      // providing the same callback.  
      await getMoreFiles(response.cursor, callback)  
    }  
}
  


