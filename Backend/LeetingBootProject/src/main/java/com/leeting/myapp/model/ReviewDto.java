package com.leeting.myapp.model;

public class ReviewDto {
    private int no;
    private int meetingno;
    private int parent_no;
    private String writer;
    private String review;

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

    public int getParent_no() {
        return parent_no;
    }

    public void setParent_no(int parent_no) {
        this.parent_no = parent_no;
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
                ", parent_no=" + parent_no +
                ", writer='" + writer + '\'' +
                ", review='" + review + '\'' +
                '}';
    }
}
