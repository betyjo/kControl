package application;

import javafx.application.Application;
import javafx.scene.Group;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.layout.StackPane;
import javafx.scene.paint.Color;
import javafx.stage.Stage;

public class Main extends Application {

    @Override
    public void start(Stage Stage) throws Exception{
    	
    	//Stage stage = new stage();
		
		Group root = new Group();
        Scene scene = new Scene (root, Color.GREEN);
        Stage.setTitle("lalala");
        Stage.setScene(scene);
        Stage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
