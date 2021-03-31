package com.example.wbdvsp21jiazhentangserverjava.services;
import com.example.wbdvsp21jiazhentangserverjava.models.Widget;
import com.example.wbdvsp21jiazhentangserverjava.repositories.WidgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class WidgetService {

    @Autowired
    WidgetRepository repository;

//    private List<Widget> widgets = new ArrayList<Widget>();
//    {
//        Widget w1 = new Widget(123l, "ABC123", "HEADING", 1, "Widgets for topic ABC123");
//        Widget w2 = new Widget(234l, "ABC123", "PARAGRAPH", 1, "widget list 1");
//        Widget w3 = new Widget(345l, "ABC234", "HEADING", 2, "Widgets for topic ABC234");
//        Widget w4 = new Widget(456l, "ABC234", "PARAGRAPH", 1, "widget list 2");
//        Widget w5 = new Widget(567l, "ABC234", "PARAGRAPH", 1, "widget list 3");
//        widgets.add(w1);
//        widgets.add(w2);
//        widgets.add(w3);
//        widgets.add(w4);
//        widgets.add(w5);
//    }

    public Widget createWidgetForTopic(Widget widget) {
        return repository.save(widget);
//        Long id = (new Date()).getTime();
//        widget.setId(id);
//        widgets.add(widget);
//        return widget;
    }

    public List<Widget> findAllWidgets() {
        return (List<Widget>) repository.findAll();
//        return widgets;
    }

    public List<Widget> findWidgetsForTopic(String topicId) {
        return repository.findWidgetForTopic(topicId);
//        List<Widget> ws = new ArrayList<Widget>();
//        for (Widget w : widgets) {
//            if (w.getTopicId().equals(topicId)) {
//                ws.add(w);
//            }
//        }
//        return ws;
    }

    public Widget findWidgetById(Long id) {
        return repository.findById(id).get();
//        for (Widget w : widgets) {
//            if (w.getId().equals(id)) {
//                return w;
//            }
//        }
//        return null;
    }

    public Integer updateWidget(Long id, Widget newWidget) {
        Widget originalWidget = findWidgetById(id);
        originalWidget.setText(newWidget.getText());
        repository.save(originalWidget);
        return 1;
//        for (int i = 0; i < widgets.size(); i++) {
//            Widget w = widgets.get(i);
//            if (w.getId().equals(id)) {
//                widgets.set(i, newWidget);
//                return 1;
//            }
//        }
//        return -1;
    }

    public Integer deleteWidget(Long id) {
        repository.deleteById(id);
        return 1;
//        int index = -1;
//        for (int i = 0; i < widgets.size(); i++) {
//            Widget w = widgets.get(i);
//            if (w.getId().equals(id)) {
//                index = i;
//            }
//        }
//        if (index >= 0) {
//            widgets.remove(index);
//            return 1;
//        }
//        return -1;
    }

}
