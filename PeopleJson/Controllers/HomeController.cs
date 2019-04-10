using PeopleJson.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PeopleJson.Controllers
{
    public class HomeController : Controller
    {
        PersonManager mgr = new PersonManager(Properties.Settings.Default.ConStr);

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public void AddPerson(Person person)
        {
            mgr.AddPerson(person);
        }

        public ActionResult GetPeople()
        {
            IEnumerable<Person> people = mgr.GetPeople();
            return Json(people, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public void DeletePerson(int id)
        {
            mgr.DeletePerson(id);
        }

        [HttpPost]
        public void EditPerson(Person person)
        {
            mgr.EditPerson(person);
        }

    }
}