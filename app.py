from flask import Flask, request, jsonify
import speech_recognition as sr

app = Flask(__name__)

@app.route('/recognize_speech', methods=['POST'])
def recognize_speech():
    # Get audio file from request
    audio_file = request.files['audio']

    # Initialize recognizer object
    r = sr.Recognizer()

    # Recognize speech
    try:
        with sr.AudioFile(audio_file) as source:
            audio_data = r.record(source)
            text = r.recognize_google(audio_data)
            return jsonify({'text': text})
    except sr.UnknownValueError:
        return jsonify({'error': 'Could not understand audio'}), 400
    except sr.RequestError as e:
        return jsonify({'error': f'Could not request results from Google Speech Recognition service: {e}'}), 500

if __name__ == '__main__':
    app.run(debug=True)
