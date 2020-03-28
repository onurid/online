namespace kimlik.online
{
    public interface ISecurity
    {
        UserResult AuthenticateUser(string username, string password, AuthenticateType authenticateType);
    }
}
