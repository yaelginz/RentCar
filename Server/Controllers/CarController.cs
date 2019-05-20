using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Http;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class CarController : ApiController
    {
        public IEnumerable<carType> GetbyAutomat(bool isAutomat)
        {


            using (DataBaseCarEntities db = new DataBaseCarEntities())
            {
                db.Configuration.ProxyCreationEnabled = false;

                List<carType> result = db.carTypes.Where(x => x.automat == isAutomat).ToList();
                //var result5 = db.carTypes.Select(m => m.year).Distinct();

                //להביא תמונה לא מתוך הדאטה בייס

                return result;

            }
        }

        [HttpGet]
        public List<int> YearAvailable()
        {

            using (DataBaseCarEntities db = new DataBaseCarEntities())
            {
                db.Configuration.ProxyCreationEnabled = false;



                List<int> result = db.carTypes.Select(m => m.year).Distinct().ToList();



                return result;

            }
        }


        //        //חיפו משתמש לפי שנת ייצור
        public List<carType> GetByYear(int year)
        {
            using (DataBaseCarEntities db = new DataBaseCarEntities())
            {
                db.Configuration.ProxyCreationEnabled = false;

                List<carType> result = db.carTypes.Where(x => x.year == year).ToList();

                return result;
            }
        }


        [HttpGet]

        public List<carType> contains(string containss)
       {
           using (DataBaseCarEntities db = new DataBaseCarEntities())
           {
             db.Configuration.ProxyCreationEnabled = false;

              List<carType> result = db.carTypes.Where(x => x.Type.Contains(containss) ||x.Manifacturer.Contains(containss)).ToList();

             return result;
         }
      }

        [HttpGet]
        public List<string> CompanyAvailable(int a)
        {

            using (DataBaseCarEntities db = new DataBaseCarEntities())
            {
                db.Configuration.ProxyCreationEnabled = false;

                List<string> result = db.carTypes.Select(m => m.Manifacturer).Distinct().ToList();
                return result;

            }
        }
        //        //חיפוש לפי טקסט חופשי
        //        //חיפוש לפי טקסט חופשי לא עובד. צריך לעשות


        //        public IEnumerable<Car> GetByFreeText(string x)
        //        {
        //            using (DataBaseCarEntities db = new DataBaseCarEntities())
        //            {
        //                db.Configuration.ProxyCreationEnabled = false;
        //                var stringProperties = typeof(Car).GetProperties().Where(t => t.PropertyType == x.GetType());
        //               var arr= db.Cars.Where(s => stringProperties.Any(l => l.GetValue(s, null) == x));

        //                return arr;
        //            }
        //        }

        //        //חיפוש מתמש לפי חברה

        public List<carType> GetByManifacturer(string mani)
        {
            using (DataBaseCarEntities db = new DataBaseCarEntities())
            {
                db.Configuration.ProxyCreationEnabled = false;

                List<carType> result = db.carTypes.Where(x => x.Manifacturer == mani).ToList();

                return result;
            }
        }

        //כל הדגמים
        [HttpGet]
        public List<string> TypeAvailable(int b)
        {

            using (DataBaseCarEntities db = new DataBaseCarEntities())
            {
                db.Configuration.ProxyCreationEnabled = false;

                List<string> result = db.carTypes.Select(m => m.Type).Distinct().ToList();
                return result;

            }
        }


        [HttpGet]
        public List<string> Getbranch(int k)
        {
            using (DataBaseCarEntities db = new DataBaseCarEntities())
            {
                db.Configuration.ProxyCreationEnabled = false;

                List<string> result = db.Branches.Select(m => m.Adress).Distinct().ToList();

                return result;
            }
        }



        [HttpGet]
        public List<Location> rentlist(int k800)
        {
            using (DataBaseCarEntities db = new DataBaseCarEntities())
            {
                db.Configuration.ProxyCreationEnabled = false;

                List<Location> result = db.Locations.Where(m=>m.UserId==k800).ToList();

                return result;
            }
        }


        [HttpGet]
        public List<int> getuserid(int k3)
        {
            using (DataBaseCarEntities db = new DataBaseCarEntities())
            {
                db.Configuration.ProxyCreationEnabled = false;

                List<int> result = db.users.Select(m => m.Id).Distinct().ToList();

                return result;
            }
        }


        [HttpGet]
        public List<int> getidcar(int k333)
        {
            using (DataBaseCarEntities db = new DataBaseCarEntities())
            {
                db.Configuration.ProxyCreationEnabled = false;

                List<int> result = db.Cars.Select(m => m.Id).Distinct().ToList();

                return result;
            }
        }

        //        //חיפוש מתמש לפי דגם

        [HttpGet]
        public List<carType> GetByType(string t)
        {
            using (DataBaseCarEntities db = new DataBaseCarEntities())
            {
                db.Configuration.ProxyCreationEnabled = false;

                List<carType> result = db.carTypes.Where(x => x.Type == t).ToList();

                return result;
            }
        }

        //חיפוש משתמש לפי טווח תאריכים
        //  חיפוש מתבצע על כל הרכבים שתאריך ההחזרה שלהם  -5 יום מהתאריך המבוקש- כך שבטוח הרכב יחזור למלאי או שהם כבר חזרו למלאי והם נמצאים בתאריך החזרה בפועל..
        //לשלוח תאריך בפורמט 2018/03/02


        [HttpGet]
        public List<carType> GetByDate(int test1)
        {

            using (DataBaseCarEntities db = new DataBaseCarEntities())
            {
                db.Configuration.ProxyCreationEnabled = false;

                List<carType> result = db.Cars.Where(x => x.IsAvailable == true).Select(y => y.carType).ToList();



                return result;

            }
        }

        [HttpGet]
        public classReturn GetByDateTwo(string cartype, string branch)
        {

            using (DataBaseCarEntities db = new DataBaseCarEntities())
            {
                db.Configuration.ProxyCreationEnabled = false;

                classReturn c = new classReturn();
                c.b = false;



                List<Car> result =
                    db.Cars.Where(x => x.IsAvailable == true && x.Type == cartype && x.Branch.Adress == branch)
                        .ToList();



                if (result.Count != 0)
                {
                    c.b = true;
                    c.carid = result[0].Id;
                }

                else
                {
                    c.b = false;
                }


                return c;
            }

        }




        //        //לאחר אישור הלקוח- מתבצעת הזמנה ויש עידכון של הרכב לרכבים לא פנויים
        //        // PUT: api/Car/5
        [HttpGet]
        public bool updateBooking(int idCar, int userId, DateTime locationStartDay, int days)
        {
            using (DataBaseCarEntities db = new DataBaseCarEntities())
            {
                bool b = false;
                db.Configuration.ProxyCreationEnabled = false;
                try
                {
                    db.Cars.FirstOrDefault(x => x.Id == idCar).IsAvailable = false;

                    Location value = new Location();

                    value.UserId = userId;
                    value.CarId = idCar;
                    value.LocationStartDay = locationStartDay;
                    value.LocationEndDate = locationStartDay.AddDays(days - 1);


                    db.Locations.Add(value);

                    db.SaveChanges();
                    b = true;
                }
                catch (Exception)
                {
                    b = false;
                }
                return b;
            }



        }


        [HttpGet]
        public int totalCost(int idCar, DateTime datereturned)
        {
            using (DataBaseCarEntities db = new DataBaseCarEntities())
            {
                int cost = 0;

                db.Configuration.ProxyCreationEnabled = false;
                try
                {

                    db.Cars.First(m => m.Id == idCar).IsAvailable = true;

                    db.Locations.OrderByDescending(x => x.LocationStartDay).Where(m => m.CarId == idCar).First()
                        .DateCarReturned = datereturned;


                    DateTime d1 = db.Locations.OrderByDescending(x => x.LocationStartDay).Where(m => m.CarId == idCar)
                        .First().LocationStartDay;
                    DateTime d2 = db.Locations.OrderByDescending(x => x.LocationStartDay).Where(m => m.CarId == idCar)
                        .First().LocationEndDate;
                    List<int> daily = db.Cars.Where(x => x.Id == idCar).Select(x => x.carType.DailyCost).ToList();
                    List<int> delay = db.Cars.Where(x => x.Id == idCar).Select(x => x.carType.DelayCost).ToList();
                    ;

                    db.SaveChanges();

                    if (datereturned > d2)
                    {
                        TimeSpan span = d2 - d1;
                        TimeSpan span2 = datereturned - d2;


                        cost = (span.Days + 1) * daily[0] + (span2.Days) * delay[0];
                        return cost;
                    }
                    else
                    {
                        TimeSpan span = datereturned - d1;
                        cost = (span.Days + 1) * daily[0];


                        return cost;
                    }



                }
                catch (Exception)
                {
                    return cost;
                }

            }


        }

        [HttpGet]
        public List<carType> updatecartype(int z)
        {
            using (DataBaseCarEntities db = new DataBaseCarEntities())
            {


                db.Configuration.ProxyCreationEnabled = false;

                return db.carTypes.ToList();
            }
        }



        [HttpPut]
        public bool updatecarType()
        {

            NameValueCollection nvc = HttpContext.Current.Request.Form;
            carType carType = new carType();

            carType.DailyCost = int.Parse(nvc["DailyCost"]);
            carType.DelayCost = int.Parse(nvc["DelayCost"]);
            carType.Manifacturer = nvc["Manifacturer"];
            carType.Type = nvc["Type"];
            carType.automat = nvc["automat"] == "1"; ;
            carType.year = int.Parse(nvc["year"]);
            string pk = nvc["carTypePrimaryKey"];

            HttpPostedFile httpPostedFile = HttpContext.Current.Request.Files["image"];


            byte[] fileData = null;
            if (httpPostedFile != null)
                using (var binaryReader = new BinaryReader(httpPostedFile.InputStream))
                {
                    fileData = binaryReader.ReadBytes(httpPostedFile.ContentLength);
                }


            carType.image = fileData;
            using (DataBaseCarEntities db = new DataBaseCarEntities())
            {



                db.Configuration.ProxyCreationEnabled = false;
                try
                {



                    db.carTypes.FirstOrDefault(m => m.Type == pk).Manifacturer = carType.Manifacturer;
                    db.carTypes.FirstOrDefault(m => m.Type == pk).DailyCost = carType.DailyCost;
                    db.carTypes.FirstOrDefault(m => m.Type == pk).DelayCost = carType.DelayCost;
                    db.carTypes.FirstOrDefault(m => m.Type == pk).year = carType.year;
                    db.carTypes.FirstOrDefault(m => m.Type == pk).automat = carType.automat;
                    db.carTypes.FirstOrDefault(m => m.Type == pk).Type = carType.Type;
                    db.carTypes.FirstOrDefault(m => m.Type == pk).image = fileData;

                    db.SaveChanges();

                    return true;
                }
                catch (Exception)
                {
                    return false;
                }

            }
        }



        [HttpDelete]
        public bool deletecartype(string pktype)
        {
            using (DataBaseCarEntities db = new DataBaseCarEntities())
            {



                db.Configuration.ProxyCreationEnabled = false;
                try
                {
                    db.carTypes.Remove(db.carTypes.First(y => y.Type == pktype));


                    db.SaveChanges();

                    return true;
                }
                catch (Exception)
                {
                    return false;
                }

            }
        }



        [Route("api/Car/AddCarType")]
        [HttpPost]
        public bool AddCarType()
        {
            NameValueCollection nvc = HttpContext.Current.Request.Form;
            carType carType = new carType();

            carType.DailyCost = int.Parse(nvc["DailyCost"]);
            carType.DelayCost = int.Parse(nvc["DelayCost"]);
            carType.Manifacturer = nvc["Manifacturer"];
            carType.Type = nvc["Type"];
            carType.automat = nvc["automat"] == "1"; ;
            carType.year = int.Parse(nvc["year"]);

            HttpPostedFile httpPostedFile = HttpContext.Current.Request.Files["image"];


            byte[] fileData = null;
            if (httpPostedFile != null)
                using (var binaryReader = new BinaryReader(httpPostedFile.InputStream))
                {
                    fileData = binaryReader.ReadBytes(httpPostedFile.ContentLength);
                }

            carType.image = fileData;

            using (DataBaseCarEntities db = new DataBaseCarEntities())
            {
                db.Configuration.ProxyCreationEnabled = false;
                try
                {
                    db.carTypes.Add(carType);
                    db.SaveChanges();
                    return true;
                }

                catch (Exception)
                {
                    return false;
                }
            }

        }

        [HttpGet]
        public List<Car> getcar(int z1)
        {
            using (DataBaseCarEntities db = new DataBaseCarEntities())
            {
                db.Configuration.ProxyCreationEnabled = false;

                return db.Cars.ToList();
            }
        }



        [HttpPut]
        public bool updatecar(int pk1, Car ct3)
        {
            using (DataBaseCarEntities db = new DataBaseCarEntities())
            {



                db.Configuration.ProxyCreationEnabled = false;
                try
                {



                    db.Cars.FirstOrDefault(m => m.Id == pk1).Type = ct3.Type;
                    db.Cars.FirstOrDefault(m => m.Id == pk1).CurrentKilometer = ct3.CurrentKilometer;
                    db.Cars.FirstOrDefault(m => m.Id == pk1).IsProper = ct3.IsProper;
                    db.Cars.FirstOrDefault(m => m.Id == pk1).IsAvailable = ct3.IsAvailable;
                    db.Cars.FirstOrDefault(m => m.Id == pk1).BranchExactLocation = ct3.BranchExactLocation;
                    db.Cars.FirstOrDefault(m => m.Id == pk1).Id = ct3.Id;
                    db.SaveChanges();

                    return true;
                }
                catch (Exception)
                {
                    return false;
                }

            }
        }


        [HttpDelete]
        public bool deletecar(int pkcar)
        {
            using (DataBaseCarEntities db = new DataBaseCarEntities())
            {



                db.Configuration.ProxyCreationEnabled = false;
                try
                {
                    db.Cars.Remove(db.Cars.First(y => y.Id == pkcar));


                    db.SaveChanges();

                    return true;
                }
                catch (Exception)
                {
                    return false;
                }

            }
        }


        [Route("api/Car/AddCar")]
        [HttpPost]
        public bool AddCar(Car newcar)
        {
            using (DataBaseCarEntities db = new DataBaseCarEntities())
            {
                db.Configuration.ProxyCreationEnabled = false;
                try
                {
                    db.Cars.Add(newcar);
                    db.SaveChanges();
                    return true;
                }

                catch (Exception)
                {
                    return false;
                }
            }

        }



        [HttpGet]
        public List<user> getusers(int z11)
        {
            using (DataBaseCarEntities db = new DataBaseCarEntities())
            {
                db.Configuration.ProxyCreationEnabled = false;

                return db.users.ToList();
            }
        }





        [HttpPut]
        [Route("api/Car/updateuser")]

        public bool updateuser()
        {
            NameValueCollection nvc = HttpContext.Current.Request.Form;

            HttpPostedFile httpPostedFile = HttpContext.Current.Request.Files["Picture"];


            byte[] fileData = null;
            if (httpPostedFile != null)
                using (var binaryReader = new BinaryReader(httpPostedFile.InputStream))
                {
                    fileData = binaryReader.ReadBytes(httpPostedFile.ContentLength);
                }

            user u = new user();

            //use.BirthDate = nvc["BirthDate"];


            int pk100 = int.Parse(nvc["pk100"]);

            u.Email = nvc["Email"];
            u.FullName = nvc["FullName"];
            u.Gender = nvc["Gender"];
            u.Id = int.Parse(nvc["Id"]);
            u.Password = nvc["Password"];
            u.UserName = nvc["UserName"];
            u.UserType = nvc["UserType"];
            u.Picture = fileData;


            using (DataBaseCarEntities db = new DataBaseCarEntities())
            {



                db.Configuration.ProxyCreationEnabled = false;
                try
                {



                    db.users.FirstOrDefault(m => m.Id == pk100).FullName = u.FullName;

                    db.users.FirstOrDefault(m => m.Id == pk100).Id = u.Id;

                    db.users.FirstOrDefault(m => m.Id == pk100).UserName = u.UserName;

                    db.users.FirstOrDefault(m => m.Id == pk100).BirthDate = u.BirthDate;

                    db.users.FirstOrDefault(m => m.Id == pk100).Gender = u.Gender;
                    db.users.FirstOrDefault(m => m.Id == pk100).Email = u.Email;
                    db.users.FirstOrDefault(m => m.Id == pk100).Password = u.Password;
                    db.users.FirstOrDefault(m => m.Id == pk100).Picture = u.Picture;

                    db.SaveChanges();

                    return true;
                }
                catch (Exception)
                {
                    return false;
                }

            }
        }




        [HttpDelete]
        public bool deleteuser(int pkuser)
        {
            using (DataBaseCarEntities db = new DataBaseCarEntities())
            {



                db.Configuration.ProxyCreationEnabled = false;
                try
                {
                    db.users.Remove(db.users.First(y => y.Id == pkuser));


                    db.SaveChanges();

                    return true;
                }
                catch (Exception)
                {
                    return false;
                }

            }
        }


        [Route("api/Car/Adduser")]
        [HttpPost]
        public bool Adduser()
        {
            NameValueCollection nvc = HttpContext.Current.Request.Form;

            HttpPostedFile httpPostedFile = HttpContext.Current.Request.Files["image"];


            byte[] fileData = null;
            if (httpPostedFile != null)
                using (var binaryReader = new BinaryReader(httpPostedFile.InputStream))
                {
                    fileData = binaryReader.ReadBytes(httpPostedFile.ContentLength);
                }

            user use = new user();

            //use.BirthDate = nvc["BirthDate"];

            use.Email = nvc["Email"];
            use.FullName = nvc["FullName"];
            use.Gender = nvc["Gender"];
            use.Id = int.Parse(nvc["Id"]);
            use.Password = nvc["Password"];
            use.UserName = nvc["UserName"];
            use.UserType = nvc["UserType"];
            use.Picture = fileData;

            using (DataBaseCarEntities db = new DataBaseCarEntities())
            {
                db.Configuration.ProxyCreationEnabled = false;
                try
                {
                    db.users.Add(use);
                    db.SaveChanges();
                    return true;
                }

                catch (Exception ex)
                {
                    return false;
                }
            }

        }




        [HttpGet]
        public List<Location> getlocation(int z111)
        {
            using (DataBaseCarEntities db = new DataBaseCarEntities())
            {
                db.Configuration.ProxyCreationEnabled = false;

                return db.Locations.ToList();
            }
        }


        [HttpPut]
        public bool updatelocation(int pk1000, Location l)
        {
            using (DataBaseCarEntities db = new DataBaseCarEntities())
            {



                db.Configuration.ProxyCreationEnabled = false;
                try
                {



                    db.Locations.FirstOrDefault(m => m.Id == pk1000).Id = l.Id;

                    db.Locations.FirstOrDefault(m => m.Id == pk1000).CarId = l.CarId;

                    db.Locations.FirstOrDefault(m => m.Id == pk1000).UserId = l.UserId;

                    db.Locations.FirstOrDefault(m => m.Id == pk1000).DateCarReturned = l.DateCarReturned;

                    db.Locations.FirstOrDefault(m => m.Id == pk1000).LocationEndDate = l.LocationEndDate;
                    db.Locations.FirstOrDefault(m => m.Id == pk1000).LocationStartDay = l.LocationStartDay;

                    db.SaveChanges();

                    return true;
                }
                catch (Exception)
                {
                    return false;
                }

            }
        }



        [HttpDelete]
        public bool deleterent(int pkrent)
        {
            using (DataBaseCarEntities db = new DataBaseCarEntities())
            {



                db.Configuration.ProxyCreationEnabled = false;
                try
                {
                    db.Locations.Remove(db.Locations.First(y => y.Id == pkrent));


                    db.SaveChanges();

                    return true;
                }
                catch (Exception)
                {
                    return false;
                }

            }
        }



        [Route("api/Car/Addrent")]
        [HttpPost]
        public bool Addrent(Location loc)
        {
            using (DataBaseCarEntities db = new DataBaseCarEntities())
            {
                db.Configuration.ProxyCreationEnabled = false;
                try
                {
                    db.Locations.Add(loc);
                    db.SaveChanges();
                    return true;
                    
                }

                catch (Exception)
                {
                    return false;
                }
            }

        }



    }



}