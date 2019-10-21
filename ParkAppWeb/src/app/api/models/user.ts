export class User
{
    _id: string;
    nom : string;
    prenom: string;
    avatar: string;
    email: string;
    phone : string;
    isBanned : boolean;
    role : string;

    constructor(user)
    {
        {
            this._id = user._id || undefined;
            this.nom = user.nom || '';
            this.prenom = user.prenom || '';
            this.avatar = user.avatar || 'assets/images/avatars/profile.jpg';
            this.email = user.email || '';
            this.phone = user.phone || '';
            this.isBanned = user.isBanned || false;
            this.role = user.role || 'locataire';
        }
    }
}
