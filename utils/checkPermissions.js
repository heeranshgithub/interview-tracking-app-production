import { UnAuthenticatedError } from "../errors/index.js";

const checkPermissions = (requestUser, resourceUserId) => {
//   if (requestUser.role === 'admin') return; 
//   nothing like role in User schema at the moment. but, if required, admin should be able to edit a job.   
    
    if(requestUser.userId === resourceUserId.toString()) return;

    throw new UnAuthenticatedError('Not authorized to access the route');
};

export default checkPermissions;