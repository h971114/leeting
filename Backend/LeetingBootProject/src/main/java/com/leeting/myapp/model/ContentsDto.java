package com.leeting.myapp.model;

public class ContentsDto {
    private int contentsno;

    private String writer; // member id

    private String date;

    private String detail;

    private String file;

    private int categoryno;

    private int contentslike;

    public ContentsDto() {}

    public ContentsDto(int contentsno, String writer, String date, String detail, String file, int categoryno, int contentslike) {
        this.contentsno = contentsno;
        this.writer = writer;
        this.date = date;
        this.detail = detail;
        this.categoryno = categoryno;
        this.contentslike = contentslike;
    }

    public ContentsDto(String writer, String date, String detail, String file, int categoryno) {
        this.writer = writer;
        this.date = date;
        this.detail = detail;
        this.file = file;
        this.categoryno = categoryno;
    }

    public int getContentsno() {
        return contentsno;
    }

    public void setContentsno(int contentsno) {
        this.contentsno = contentsno;
    }

    public String getWriter() {
        return writer;
    }

    public void setWriter(String writer) {
        this.writer = writer;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public String getFile() {
        return file;
    }

    public void setFile(String file) {
        this.file = file;
    }

    public int getCategoryno() {
        return categoryno;
    }

    public void setCategoryno(int categoryno) {
        this.categoryno = categoryno;
    }

    public int getContentslike() {
        return contentslike;
    }

    public void setContentslike(int contentslike) {
        this.contentslike = contentslike;
    }

    @Override
    public String toString() {
        return "ContentsDto{" +
                "contentsno=" + contentsno +
                ", writer='" + writer + '\'' +
                ", date='" + date + '\'' +
                ", detail='" + detail + '\'' +
                ", file='" + file + '\'' +
                ", categoryno=" + categoryno +
                ", contentslike=" + contentslike +
                '}';
    }
}
