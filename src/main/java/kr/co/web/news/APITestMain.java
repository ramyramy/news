package kr.co.web.news;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

import com.fasterxml.jackson.databind.ObjectMapper;

public class APITestMain {	

    public static void main(String[] args) {
    	
    	//////////////////// 네이버 뉴스 고정값
        //String clientId = "H4HBbvkERiGJYWobU7Dj";//애플리케이션 클라이언트 아이디값";
        //String clientSecret = "VjtarKiv4X";//애플리케이션 클라이언트 시크릿값";
        //String baseurl = "https://openapi.naver.com/v1/search/news.json";
        
        //파라미터
        String params = "display=10&start=1&sort=sim&query=정치";        
        
        //정치, 경제, 한국, 건강, 해외, 과학기술, 연예, 스포츠
        
        OpenJsonAPI api = new OpenJsonAPI(NaverNews.clientidKey, NaverNews.clientIdValue, NaverNews.clientSecretKey, NaverNews.clientSecretValue);                    

        NaverNews news = api.get(NaverNews.baseurl, params, NaverNews.class);               
        
        System.out.println(news.getDisplay());
        System.out.println(news.getLastBuildDate());

        for(NewsData data : news.getItems()) {
        	System.out.println("no : " + data.getNno());
        	System.out.println("title : " + data.getTitle());
        	System.out.println("link : " + data.getLink());
        	System.out.println("date : " + data.getPubDate());
        	System.out.println("news : " + data.getDescription());
        }        
    }
}
