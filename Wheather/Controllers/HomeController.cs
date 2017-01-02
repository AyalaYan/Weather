using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Mvc;

namespace Weather.Controllers
{
    public class HomeController : Controller
    {
        public HttpResponseMessage GetCities()
        {
            var json = System.IO.File.ReadAllText(Server.MapPath(@"~/app/USACities.json"));

            return new HttpResponseMessage()
            {
                Content = new StringContent(json, Encoding.UTF8, "application/json"),
                StatusCode = HttpStatusCode.OK
            };
        }

    }
}
