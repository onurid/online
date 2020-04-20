using System;
using System.Security;
using System.Text;

namespace kimlik.online.tests
{
    class Program
    {
        static ISecurity security;
        static void Main()
        {
            Run();
        }

        static void Run()
        {
            var title = "Hello kimlik.online!";
            Console.WriteLine(title + "\n");
            Console.Title = title;
            ConsoleKey key = ConsoleKey.N;
            while (key == ConsoleKey.N)
            {
                var opretaionType = ChooseOperation();
                EnterIdentity(opretaionType);
                Console.WriteLine("\n\nAgain: (N), Close: Press enter the any key..");
                key = Console.ReadKey().Key;
                Console.Clear();
            }
        }

        static AuthenticateType ChooseOperation()
        {
            Console.Write("Operations: (1) Login    (2) New User");
            Console.Write("\nChoose the operation:  ");
            var input = 0;
            var state = false;
            while(!state)
            {
                Console.Write("\b\0\b");
                state = int.TryParse(Console.ReadKey().KeyChar.ToString(), out input);
                if (state)
                    state = input == 1 || input == 2;
            }
            return (AuthenticateType)input;
        }

        static void EnterIdentity(AuthenticateType authenticateType)
        {
            Console.Clear();
            Console.Write("Please, enter the username: ");
            string username = Console.ReadLine();
            Console.Write("Please, enter the password: ");
            string password = GetConsolePassword();
            security = new Security();
            var result = security.AuthenticateUser(username, password, authenticateType);
            Console.Write("\nResult: ");
            if (result != null)
                Console.Write(result.Status ? result.Token : result.Message);
        }

        static string GetConsolePassword()
        {
            StringBuilder sb = new StringBuilder();
            while (true)
            {
                ConsoleKeyInfo cki = Console.ReadKey(true);
                if (cki.Key == ConsoleKey.Enter)
                {
                    Console.WriteLine();
                    break;
                }

                if (cki.Key == ConsoleKey.Backspace)
                {
                    if (sb.Length > 0)
                    {
                        Console.Write("\b\0\b");
                        sb.Length--;
                    }

                    continue;
                }

                Console.Write('*');
                sb.Append(cki.KeyChar);
            }

            return sb.ToString();
        }

        

        static SecureString GetConsoleSecurePassword()
        {
            SecureString pwd = new SecureString();
            while (true)
            {
                ConsoleKeyInfo i = Console.ReadKey(true);
                if (i.Key == ConsoleKey.Enter)
                {
                    break;
                }
                else if (i.Key == ConsoleKey.Backspace)
                {
                    pwd.RemoveAt(pwd.Length - 1);
                    Console.Write("\b \b");
                }
                else
                {
                    pwd.AppendChar(i.KeyChar);
                    Console.Write("*");
                }
            }
            return pwd;
        }

    }
}
