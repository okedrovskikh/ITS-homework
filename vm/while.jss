set 101 20
set 102 3
: if more 101 102
; if less 102 101
sub 101 102 101
goto ;
add 102 101 102
goto :
output 101
output 102