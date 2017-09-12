package kr.co.web.news;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import com.fasterxml.jackson.databind.ObjectMapper;

public class OpenJsonAPI {

	private String clientIdKey;
    private String clientSecretKey;
    private String clientIdValue;
    private String clientSecretValue;
    
	public OpenJsonAPI(String clientIdKey, String clientIdValue, String clientSecretKey, String clientSecretValue) {
		super();
		this.clientIdKey = clientIdKey;
		this.clientSecretKey = clientSecretKey;
		this.clientIdValue = clientIdValue;
		this.clientSecretValue = clientSecretValue;
	}
	public String getClientIdKey() {
		return clientIdKey;
	}
	public void setClientIdKey(String clientIdKey) {
		this.clientIdKey = clientIdKey;
	}
	public String getClientSecretKey() {
		return clientSecretKey;
	}
	public void setClientSecretKey(String clientSecretKey) {
		this.clientSecretKey = clientSecretKey;
	}
	public String getClientIdValue() {
		return clientIdValue;
	}
	public void setClientIdValue(String clientIdValue) {
		this.clientIdValue = clientIdValue;
	}
	public String getClientSecretValue() {
		return clientSecretValue;
	}
	public void setClientSecretValue(String clientSecretValue) {
		this.clientSecretValue = clientSecretValue;
	}
	
	public <T> T get(String baseurl, String params, Class T) {
		try {
			StringBuilder apiURL = new StringBuilder();
			apiURL.append(baseurl);
			apiURL.append("?");
			for (String param : params.split("&")) {
				String[] val = param.split("=");
				apiURL.append(URLEncoder.encode(val[0], "UTF-8"));	//key
				apiURL.append("=");
				apiURL.append(URLEncoder.encode(val[1], "UTF-8"));	//value
				apiURL.append("&");	//value
			}
			apiURL.deleteCharAt(apiURL.toString().length() - 1);
			
            URL url = new URL(apiURL.toString());
            HttpURLConnection con = (HttpURLConnection)url.openConnection();
            con.setRequestMethod("GET");
            con.setRequestProperty(this.clientIdKey, this.clientIdValue);
            con.setRequestProperty(this.clientSecretKey, this.clientSecretValue);
            int responseCode = con.getResponseCode();
            if(responseCode != 200) { // 에러 발생
            	System.out.println("???");
                throw new Exception(con.getErrorStream().toString());
            }
            
            InputStream br = con.getInputStream();
            ObjectMapper mapper = new ObjectMapper();
            Object news = mapper.readValue(br, T);
            
            br.close();
            
            return (T)news;

        } catch (Exception e) {
            System.out.println(e);
        }
		
		return null;
	}
	
	public <T> T post(String baseurl, String params, Class T) {
		try {
			StringBuilder text = new StringBuilder();
			for (String param : params.split("&")) {
				String[] val = param.split("=");
				text.append(URLEncoder.encode(val[0], "UTF-8"));	//key
				text.append("=");
				text.append(URLEncoder.encode(val[1], "UTF-8"));	//value
				text.append("&");	//value
			}
			text.deleteCharAt(text.toString().length() - 1);

            byte[] postData       = text.toString().getBytes();
            int    postDataLength = postData.length;

            URL url = new URL(baseurl);
            HttpURLConnection con = (HttpURLConnection)url.openConnection();
            con.setRequestMethod("POST");            
            con.setRequestProperty( "Content-Type", "application/x-www-form-urlencoded");
            con.setRequestProperty( "Content-Length", Integer.toString( postDataLength ));
            con.setRequestProperty(this.clientIdKey, this.clientIdValue);
            con.setRequestProperty(this.clientSecretKey, this.clientSecretValue);
            con.setDoOutput(true);
            
            DataOutputStream wr = new DataOutputStream(con.getOutputStream());
            wr.write( postData );            
            wr.close();
            
            int responseCode = con.getResponseCode();
            if(responseCode != 200) { // 에러 발생
                throw new Exception(con.getErrorStream().toString());
            }            
            
            InputStream br = con.getInputStream();
            ObjectMapper mapper = new ObjectMapper(); 
            Object news = mapper.readValue(br, T);
            
            
            br.close();
            
            return (T)news;

        } catch (Exception e) {
            System.out.println(e);
        }
		
		return null;
	}
}
