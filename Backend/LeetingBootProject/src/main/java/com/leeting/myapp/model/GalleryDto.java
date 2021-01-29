package com.leeting.myapp.model;

public class GalleryDto {
    private Long id;
    private String title;
    private String filePath;

    public GalleryDto() {
    }

    public GalleryDto(String title, String filePath) {
        this.title = title;
        this.filePath = filePath;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }
}
