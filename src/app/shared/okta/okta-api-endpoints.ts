import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class OktaApiEndpoints {
  constructor() { }

    // API Endpoints
   //Consumes License
   strUsersEP = '/api/v1/users/' ;
   strUserMe = '/api/v1/users/me';
   strFactors = '/api/v1/users/';
   strAllUsersFilter = '/api/v1/users';
   strActiveUserFilter = '/api/v1/users?filter=status%20eq%20%22ACTIVE%22';
   strRecoveryUserFilter = '/api/v1/users?filter=status%20eq%20%22RECOVERY%22';
   strPWExpiredFilter = '/api/v1/users?filter=status%20eq%20%22PASSWORD_EXPIRED%22';
   strLockedOutFilter = '/api/v1/users?filter=status%20eq%20%22LOCKED_OUT%22';
   strSuspendedFilter = '/api/v1/users?filter=status%20eq%20%22SUSPENDED%22';
 
   //Doesn't Consumes License
   strProvisionedUsersFilter = '/api/v1/users?filter=status%20eq%20%22PROVISIONED%22'; 
   strStagedUsersFilter = '/api/v1/users?filter=status%20eq%20%22STAGED%22';
   strDeprovisionedFilter = '/api/v1/users?filter=status%20eq%20%22DEPROVISIONED%22';

   //Groups
   strAllGroupsFilter = '/api/v1/groups?limit=100&expand=app,stats';

   //Apps
   strAllApps = '/api/v1/apps';

   // Factors
   strMFAMethods = "/api/v1/org/factors";

}