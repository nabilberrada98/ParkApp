export class User
{
    id: string;
    nom : string;
    prenom: string;
    avatar: string;
    email: string;
    NumTel : string;
    isBanned : boolean;
    roles : string [];

    constructor(user)
    {
        {
            this.id = user.id || undefined;
            this.nom = user.nom || '';
            this.prenom = user.prenom || '';
            this.avatar = user.avatar || 'assets/images/avatars/profile.jpg';
            this.email = user.email || '';
            this.NumTel = user.NumTel || '';
            this.isBanned = user.isBanned || '';
            this.roles = user.roles || ['Locataire'];
        }
    }
}
