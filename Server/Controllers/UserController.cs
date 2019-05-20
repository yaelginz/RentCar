using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http;

namespace WebApplication1.Controllers
{
    public class UserController : ApiController
    {
        // GET: api/User
        public IEnumerable<string> Get()
        {
        
                // Extract property from object
                NameValueCollection nvc = HttpContext.Current.Request.Form;

            return new string[] { "value1", "value2" };
        }

        // GET: api/User/5
        public user Get(string userName, string password, string userType)
        {
            using (DataBaseCarEntities db = new DataBaseCarEntities())
            {
                db.Configuration.ProxyCreationEnabled = false;

                user obj = db.users.FirstOrDefault(m => m.Password == password && m.UserName == userName &&
                                                        m.UserType == userType);

                if (obj != null)
                {
                    return  obj;
                }
                else
                {
                    return null;
                }
 
            }
        }

        // POST: api/User
        public void Post()
        {
            NameValueCollection nvc = HttpContext.Current.Request.Form;

        }

        // PUT: api/User/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/User/5
        public void Delete(int id)
        {
        }
    }
}

