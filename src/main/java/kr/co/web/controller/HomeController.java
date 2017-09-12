package kr.co.web.controller;
 
import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import kr.co.web.news.NaverNews;
import kr.co.web.news.NewsData;
import kr.co.web.news.OpenJsonAPI;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {

  private static final Logger logger = LoggerFactory.getLogger(HomeController.class);

  /**
   * Simply selects the home view to render by returning its name.
   */
  @RequestMapping(value = "/", method = RequestMethod.GET)
  public ModelAndView home(Locale locale, HttpServletRequest req) {
    logger.info("Welcome home! The client locale is {}.", locale);

    Date date = new Date();
    DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);

    ModelAndView mav = new ModelAndView();
    String formattedDate = dateFormat.format(date);        
    mav.addObject("serverTime", formattedDate);		        	
	
	OpenJsonAPI api = new OpenJsonAPI(NaverNews.clientidKey, NaverNews.clientIdValue, NaverNews.clientSecretKey, NaverNews.clientSecretValue);
	String query = req.getParameter("query");
	if (null == query || query.isEmpty()) {
		query = "정치";
	}
	
	String params = "display=10&start=1&sort=sim&query=" + query; 
	NaverNews news = api.get(NaverNews.baseurl, params, NaverNews.class);               	
	
	mav.addObject("first_news", news.getItems());
	mav.setViewName("home");

    return mav;
  }    
}
