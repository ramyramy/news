package kr.co.web.controller;

import java.util.Locale;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import kr.co.web.news.NaverNews;
import kr.co.web.news.OpenJsonAPI;

@Controller
public class SearchController {
	
	@RequestMapping(value = "/search", method = RequestMethod.GET)
	public ModelAndView search(Locale locale, HttpServletRequest req) {
		
		ModelAndView mav = new ModelAndView();
		
		OpenJsonAPI api = new OpenJsonAPI(NaverNews.clientidKey, NaverNews.clientIdValue, NaverNews.clientSecretKey, NaverNews.clientSecretValue);
		String query = req.getParameter("query");
		if(null == query || query.isEmpty()) {
			System.out.println("검색어를 입력해주세요.");
			
		}else {
			
			String params = "display=100&start=1&sort=sim&query="+query;
			NaverNews news = api.get(NaverNews.baseurl,params, NaverNews.class);
			mav.addObject("first_news", news.getItems());
			mav.setViewName("home");
		}
		
		return mav;
	}
	

}
