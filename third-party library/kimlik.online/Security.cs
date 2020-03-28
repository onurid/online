using System;
using System.Net.Http;
using System.Text;
using Newtonsoft.Json;

namespace kimlik.online
{
    public class Security : ISecurity
    {
        private const string Url = "http://kimlik.online";
        private const string ApiPrefix = "api";
        private static string userTokenPath = "user/login";
        private static string newUserPath = "user/new";

        private readonly string userTokenUrl;
        private readonly string newUserUrl;

        private readonly HttpClient client;
        public Security()
        {
            userTokenUrl = $"{ApiPrefix}/{userTokenPath}";
            newUserUrl = $"{ApiPrefix}/{newUserPath}";
            client = new HttpClient();
            client.BaseAddress = new Uri(Url);
        }
       
        public UserResult AuthenticateUser(string username, string password, AuthenticateType authenticateType)
        {
            UserResult userTokenResult = null;

            var jsonInString = JsonConvert.SerializeObject(new { Email = username, Password = password });
            var postUrl = string.Empty;

            switch(authenticateType)
            {
                case AuthenticateType.Login:
                    postUrl = userTokenUrl;
                    break;
                case AuthenticateType.NewUser:
                    postUrl = newUserUrl;
                    break;
                default:
                    return userTokenResult;
            }

            var response = client.PostAsync(postUrl, new StringContent(jsonInString, Encoding.UTF8, "application/json"));
            
            if (response.Result.StatusCode == System.Net.HttpStatusCode.OK)
            {
                userTokenResult = new UserResult();

                var content = response.Result.Content.ReadAsStringAsync();
                var result = JsonConvert.DeserializeObject<Result>(content.Result);

                userTokenResult.Status = result.Status;

                if (result.Status)
                    userTokenResult.Token = result.Account.Token;
                else
                    userTokenResult.Message = result.Message;
            }

            return userTokenResult;
        }
    }
}
