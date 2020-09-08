import downloadGit from 'download-git-repo';

export const downloadLocal = async (projectName, projectType) => {
  let templatePath = '';
  switch (projectType) {
    case 'web':
      templatePath = 'hql7/xy-template-vue';
      break;
    case 'vue3-ts':
      templatePath = 'Lisa-black/minxs-template-vue3-ts';  
      break;
    case 'mfe-subapp':
      templatePath = 'hql7/xy-template-mfe-subapp-vue';
      break;
    case 'mfe-master':
      templatePath = 'hql7/xy-template-mfe-master-vue';
      break;
    default:
      templatePath = 'hql7/xy-template-vue';
  }

  return new Promise((resolve, reject) => {
    //projectName 为下载到的本地目录
    downloadGit(templatePath, projectName, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}
