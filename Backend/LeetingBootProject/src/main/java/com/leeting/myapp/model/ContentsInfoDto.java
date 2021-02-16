package com.leeting.myapp.model;

public class ContentsInfoDto {
    private int no;
    private int contentsno;
    private String userid;
    private boolean likestatus;

    public ContentsInfoDto(int no, int contentsno, String userid, boolean likestatus) {
        this.no = no;
        this.contentsno = contentsno;
        this.userid = userid;
        this.likestatus = likestatus;
    }

    public int getNo() {
        return no;
    }

    public void setNo(int no) {
        this.no = no;
    }

    public int getContentsno() {
        return contentsno;
    }

    public void setContentsno(int contentsno) {
        this.contentsno = contentsno;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public boolean isLikestatus() {
        return likestatus;
    }

    public void setLikestatus(boolean likestatus) {
        this.likestatus = likestatus;
    }

    @Override
    public String toString() {
        return "ContentsInfoDto{" +
                "no=" + no +
                ", contentsno=" + contentsno +
                ", userid='" + userid + '\'' +
                ", likestatus=" + likestatus +
                '}';
    }
}
