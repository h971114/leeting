package com.leeting.myapp.model;

public class ReviewDto {
    private int no;
    private int meetingno;
    private String date;
    private String writer;
    private String review;

    public ReviewDto() {
    }

    public int getNo() {
        return no;
    }

    public void setNo(int no) {
        this.no = no;
    }

    public int getMeetingno() {
        return meetingno;
    }

    public void setMeetingno(int meetingno) {
        this.meetingno = meetingno;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getWriter() {
        return writer;
    }

    public void setWriter(String writer) {
        this.writer = writer;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    @Override
    public String toString() {
        return "ReviewDto{" +
                "no=" + no +
                ", meetingno=" + meetingno +
                ", date='" + date + '\'' +
                ", writer='" + writer + '\'' +
                ", review='" + review + '\'' +
                '}';
    }
}
