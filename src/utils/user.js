
export const normalizeUser = (appwriteUser) => ({
  id: appwriteUser.$id,
  email: appwriteUser.email,
  name: appwriteUser.name,
  labels: appwriteUser.labels || [],
  Avatar: appwriteUser.avatar,
  emailVerification: appwriteUser.emailVerification,
 
});
