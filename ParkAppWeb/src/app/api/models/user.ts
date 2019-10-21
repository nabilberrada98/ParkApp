export class User
{
    id: string;
    nom : string;
    prenom: string;
    avatar: string;
    email: string;
    NumTel : string;
    isBanned : boolean;
    role : string;

    constructor(user)
    {
        {
            this.id = user.id || user._id || undefined;
            this.nom = user.nom || '';
            this.prenom = user.prenom || '';
            this.avatar = user.avatar || 'assets/images/avatars/profile.jpg';
            this.email = user.email || '';
            this.NumTel = user.phone || '';
            this.isBanned = user.isBanned || false;
            this.role = user.role || 'locataire';
        }
    }
}
