import 'package:globo_fitness/data/weather.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class HttpHelper {
  //http://api.openweathermap.org/data/2.5/weather?q=London&appid=e5ddb94cf71e01e3e64f5c08768891ee
  final String authority = 'api.openweathermap.org';
  final String path = 'data/2.5/weather';
  final String apiKey = 'e5ddb94cf71e01e3e64f5c08768891ee';

  Future<Weather> getWeather(String location) async {
    Map<String, dynamic> parrameters = {'q': location, 'appId': apiKey};
    Uri uri = Uri.https(authority, path, parrameters);
    http.Response result = await http.get(uri);
    Map<String, dynamic> data = json.decode(result.body);
    Weather weather = Weather.fromJson(data);

    return weather;
  }
}
