ATTACH DATABASE '$ATTACH_DB' as OLD;

insert into Tag(name, sort_order) select name, rowid from OLD.Tag;
update Tag set sort_order = id;

insert into ReferenceName(name, sort_order) select name, rowid from OLD.ReferenceName;
update ReferenceName set sort_order = id;

update ReferenceName set sort_order = sort_order + 1 where sort_order > 12;
update ReferenceName set sort_order = 13 where id = 47;

update ReferenceName set sort_order = sort_order + 1 where sort_order > 18;
update ReferenceName set sort_order = 19 where id = 48;

insert into TestImage select * from OLD.TestImage;

insert into BloodTest select bt.id, bt.date, t.id from OLD.BloodTest as bt join Tag as t on bt.tag = t.name;

insert into BloodTestEntry select bt.id, t.id, bt.value from OLD.BloodTestEntry as bt
                                                       join ReferenceName as t on bt.name = t.name;

insert into BloodTest_BloodTestEntry select * from OLD.BloodTest_BloodTestEntry;
insert into BloodTest_TestImage select * from OLD.BloodTest_TestImage;